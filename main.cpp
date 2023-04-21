#include <winsock2.h>
#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <algorithm>

using namespace std;


int main()
{
    // Ініціалізуємо WinSock
    WSADATA wsaData;
    int iResult = WSAStartup(MAKEWORD(2, 2), &wsaData);
    if (iResult != 0) {
        cerr << "Error initializing WinSock: " << iResult << endl;
        return 1;
    }

    // Створюємо сокет
    SOCKET listenSocket = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);
    if (listenSocket == INVALID_SOCKET) {
        cerr << "Error creating socket: " << WSAGetLastError() << endl;
        WSACleanup();
        return 1;
    }

    // Підключаємо сокет до порту 80
    sockaddr_in serverAddr;
    serverAddr.sin_family = AF_INET;
    serverAddr.sin_addr.s_addr = INADDR_ANY;
    serverAddr.sin_port = htons(80);
    iResult = bind(listenSocket, (sockaddr*)&serverAddr, sizeof(serverAddr));
    if (iResult == SOCKET_ERROR) {
        cerr << "Error binding socket: " << WSAGetLastError() << endl;
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }

    // Починаємо слухати вхідні з'єднання
    iResult = listen(listenSocket, SOMAXCONN);
    if (iResult == SOCKET_ERROR) {
        cerr << "Error listening on socket: " << WSAGetLastError() << endl;
        closesocket(listenSocket);
        WSACleanup();
        return 1;
    }
    cout<<"Server start\n";
    // Безкінечний цикл обробки запитів
    int bytes_received;
    do {
        // Очікуємо з'єднання
        sockaddr_in clientAddr;
        int clientAddrSize = sizeof(clientAddr);
        SOCKET client_socket = accept(listenSocket, (sockaddr*)&clientAddr, &clientAddrSize);
        if (client_socket == INVALID_SOCKET) {
            cerr << "Error accepting connection: " << WSAGetLastError() << endl;
            closesocket(listenSocket);
            WSACleanup();
            return 1;
        }

        // Отримуємо HTTP-запит від клієнта
        string request_data;
        char buffer[1024] = {0};
        bytes_received = recv(client_socket, buffer, 1024, 0);
        if (bytes_received == 0) {
            break;
        }
        request_data = string(buffer, bytes_received);

// Розбираємо отриманий запит
        stringstream ss(request_data);
        string request_method, request_path, request_protocol;
        getline(ss, request_method, ' ');
        getline(ss, request_path, ' ');
        getline(ss, request_protocol, '\r');

// Встановлюємо значення шляху за замовчуванням якщо він не заданий
        if (request_path == "/site/") {
            request_path = "/site/1.html";
        }

// Визначаємо тип вмісту файлу за його розширенням
        string content_type = "";
        string file_extension = request_path.substr(request_path.find_last_of(".") + 1);
        cout<<"-----------------------\n"<<file_extension;
        replace(file_extension.begin(),file_extension.end(),'?','\0');
        cout<<endl<<file_extension<<endl;
        if (file_extension == "html") {
            content_type = "text/html";
        }
        else if (file_extension == "css") {
            content_type = "text/css";
        }
        else if (file_extension == "js") {
            content_type = "application/javascript";
        }

// Відкриваємо файл і відправляємо його зміст клієнту
        string file_path = ".." + request_path;
        if (file_path[file_path.length()-1]=='?')file_path[file_path.length()-1]='\0';
        ifstream file(file_path, ios::binary | ios::ate);
        if (file) {
            ifstream::pos_type file_size = file.tellg();
            vector<char> file_content(file_size);
            file.seekg(0, ios::beg);
            file.read(&file_content[0], file_size);
            string response = "HTTP/1.1 200 OK\r\n";
            response += "Content-Type: " + content_type + "; charset=utf-8\r\n";
            response += "\r\n";
            response += string(file_content.begin(), file_content.end());
            send(client_socket, response.c_str(), response.length(), 0);
        }
        else {
            string response = "HTTP/1.1 404 Not Found\r\n";
            response += "Content-Type: text/plain; charset=utf-8\r\n";
            response += "\r\n";
            response += "Error 404: Page not found";
            send(client_socket, response.c_str(), response.length(), 0);
        }

// Закриваємо з'єднання з клієнтом
        closesocket(client_socket);

    }
    while (bytes_received>0);
    return 0;
}
cmake_minimum_required(VERSION 3.25)
project(Lab_5)

set(CMAKE_CXX_STANDARD 17)

add_executable(Lab_5 main.cpp)
target_link_libraries(Lab_5 ws2_32.lib)
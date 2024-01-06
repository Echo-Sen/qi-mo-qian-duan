import request from '@/utils/request'
// 查
export function getStudents() {
  return request({
    url: '/students',
    method: 'get'
  })
}
// 学号查
export function getStudentById(id) {
  return request({
    url: '/students/' + id,
    method: 'get'
  })
}
// 增
export function addStudent(student) {
  return request({
    url: '/students/insert',
    method: 'post',
    data: student
  })
}
// 删
export function deleteStudentById(id) {
  return request({
    url: '/students/' + id,
    method: 'delete',
  })
}

// 查成绩
export function getAllGrades() {
  return request({
    url: '/sc',
    method: 'POST'
  })
}

import { RouteConfig } from '@interfaces/route'
import { Method } from '@constants/enum'
import { PERMISSIONS } from '@configs'
import { validateRequest } from '@middleware/validate-request'
import { loginSchema } from '@request/auth'
import {
  createUserSchema,
  getUserSchema,
  updateUserSchema,
} from '@request/user'
import * as authController from '@controllers/auth'
import * as userController from '@controllers/user'

const routesConfig: RouteConfig[] = [
  {
    method: Method.Post,
    path: 'auth/login',
    controller: authController.login,
    middleware: [validateRequest({ validation: { body: loginSchema } })],
  },
  {
    method: Method.Post,
    path: 'auth/logout',
    controller: authController.logout,
    auth: true,
  },
  {
    method: Method.Post,
    path: 'auth/register',
    controller: authController.signUp,
    middleware: [validateRequest({ validation: { body: createUserSchema } })],
  },
  {
    method: Method.Get,
    path: 'users',
    controller: userController.getUsers,
    middleware: [],
    auth: true,
    permissions: [PERMISSIONS.GET_USERS],
  },
  {
    method: Method.Get,
    path: 'users/:id',
    controller: userController.getUserById,
    middleware: [validateRequest({ validation: { params: getUserSchema } })],
    auth: true,
    permissions: [PERMISSIONS.GET_USER],
  },
  {
    method: Method.Post,
    path: 'users',
    controller: userController.createUser,
    middleware: [validateRequest({ validation: { body: createUserSchema } })],
    auth: true,
    permissions: [PERMISSIONS.CREATE_USER],
  },
  {
    method: Method.Put,
    path: 'users/:id',
    controller: userController.updateUser,
    middleware: [validateRequest({ validation: { body: updateUserSchema } })],
    auth: true,
    permissions: [PERMISSIONS.UPDATE_USER],
  },
  {
    method: Method.Delete,
    path: 'users/:id',
    controller: userController.deleteUser,
    middleware: [validateRequest({ validation: { params: getUserSchema } })],
    auth: true,
    permissions: [PERMISSIONS.DELETE_USER],
  },
]

export default routesConfig

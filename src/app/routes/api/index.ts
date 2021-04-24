import express from 'express'

import { Middleware } from '@interfaces/route'
import { Controller } from '@interfaces/route-context'
import { toArray } from '@utils/common'
import { getFullUrlPath } from '@utils/route'
import checkAuth from '@middleware/check-auth'
import checkPermission from '@middleware/check-permission'
import { makeRouteContext } from '@middleware/route-context'

import routesConfig from './config'

const router = express.Router()

const setRouteMiddleWare = (
  middleware: Middleware[],
  controller: Controller,
): Middleware[] => {
  const routeContext = makeRouteContext(controller)
  if (middleware.length === 0) {
    return [routeContext]
  }

  return [...middleware, routeContext]
}

routesConfig.forEach((routeConfig) => {
  const middleware: Middleware[] = []

  if (routeConfig.auth || !!routeConfig?.permissions) {
    middleware.push(checkAuth)
  }

  middleware.push(checkPermission(routeConfig.permissions))

  const routeMiddleware = [...middleware, ...toArray(routeConfig?.middleware)]
  const routeFullPath = getFullUrlPath(routeConfig.path, routeConfig.version)

  router[routeConfig.method](
    routeFullPath,
    ...setRouteMiddleWare(routeMiddleware, routeConfig.controller),
  )
})

export default router

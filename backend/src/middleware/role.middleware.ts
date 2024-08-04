import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class RoleMiddleware implements NestMiddleware {
	use(req: Request & { user: any }, res: Response, next: NextFunction) {
		const user = req.user

		console.log(2, 'RoleMiddleware', user)
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' })
		}

		if (user.isAdmin) {
			req.isAdmin = true
		} else {
			req.isAdmin = false
		}

		console.log(3, req.isAdmin)
		next()
	}
}

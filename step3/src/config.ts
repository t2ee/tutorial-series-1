import {
    Configuration,
    Bean,
} from '@t2ee/core';
import {
    NotFoundHandler,
    ErrorHandler,
    Request,
    Response,
} from '@t2ee/vader';
import {
    ValidationError,
} from '@t2ee/validation';

@Configuration
class Config {
    @Bean('NotFoundHandler')
    notFoundHandler(): NotFoundHandler {
        return {
            async handle(req: Request, data: void): Promise<Response> {
                const res = new Response();
                res.body = {
                    error: 'not found',
                }
                return res;
            }
        }
    }

    @Bean('ErrorHandler')
    errorHandler(): ErrorHandler {
        return {
            async handle(req: Request, e: Error): Promise<Response> {
                let error = 'internal error';
                if (e instanceof ValidationError) {
                    error = 'request error';
                }
                const res = new Response();
                res.body = {
                    error,
                }
                return res;
            }
        }
    }

}
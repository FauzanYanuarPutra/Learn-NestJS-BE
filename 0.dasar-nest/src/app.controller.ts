import { Controller, Get } from "@nestjs/common";

@Controller('/app')
class AppController {
  @Get('/about')
  getHello(): string {
    return 'About Page';
  }

  @Get('/contact')
  getContact(): string {
    return 'Contact Page';
  }
}

export default AppController

import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateTaskDto } from './dtos/crreate-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(public tasksService: TasksService) {}

  @Get()
  async listTasks(@Req() req: Request, @Res() res: Response) {
    const data = await this.tasksService.findAll()
    
    res.status(200).json({ message: 'Hello Guys', data });
  }
  @Get('/:id')
  async getTasks(@Param('id') id: number, @Req() req: Request, @Res() res: Response): Promise<Response> {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'id must be number' });
    }
    const data = await this.tasksService.findOne(Number(id));
    if (!data) throw new NotFoundException('Task not found');
    
    return res.status(200).json({ message: 'Detial tasks', id, data });
  }

  @Post()
  async createTasks(@Body() body: CreateTaskDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    const data = await this.tasksService.create(body.content);

    return res.status(200).json({ message: 'crate successfully', body: body.content, data });
  }

  @Patch('/:id')
  async updateTasks(@Param('id') id: number, @Body() body: CreateTaskDto, @Req() req: Request, @Res() res: Response): Promise<Response> {
    if (isNaN(id)) {
      return res.status(400).json({ message: 'id must be number' });
    }

    const data = await this.tasksService.update(Number(id), body.content);
    if(!data) throw new NotFoundException('Task not found');
    
    return res.status(200).json({ message: 'update successfully', id, data });
  }

  @Delete('/:id')
  async deleteTasks(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const { id } = req.params;

    return res.status(200).json({ message: 'delete successfully', id });
  }
}

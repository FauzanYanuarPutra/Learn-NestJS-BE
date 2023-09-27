import { Injectable } from "@nestjs/common"
import { writeFile, readFile } from "fs/promises"

@Injectable()
export class TasksRepository {
  async findAll() {
      const data = await readFile('tasks.json', 'utf-8')  
      const tasks = JSON.parse(data)
  
      return tasks
  }
  
  async findOne(id: number) { 
    const data = await readFile('tasks.json', 'utf-8')  
    const tasks = JSON.parse(data)

    const task = tasks.find((task: any) => task.id === id)

    return task
  }

  async create(content: string) { 
    const datas = await readFile('tasks.json', 'utf-8')  
    const tasks = JSON.parse(datas)

    tasks.push({
      id: tasks[tasks.length - 1].id + 1,
      content
    })

    await writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8')

    return tasks
  }

  async update(id: number, content: string) {
    const datas = await readFile('tasks.json', 'utf-8')
    const tasks = JSON.parse(datas)

    const task = tasks.find((task: any) => task.id === id)
    if(!task) {
      return
    }

    task.content = content

    await writeFile('tasks.json', JSON.stringify(tasks, null, 2), 'utf-8')

    return task
  }
}

import { ICategoryService } from "../../application/interfaces/ICategoryService.js";
import { categoryApi } from "../../api/categoryApi.js";

export class CategoryService extends ICategoryService {
  async create(data) {
    const response = await categoryApi.create(data);
    return response.data;
  }
  async getAll() {
    const response = await categoryApi.getAll();
    return response.data;
  }
  async getById(id) {
    const response = await categoryApi.getById(id);
    return response.data;
  }
  async update(id, data) {
    const response = await categoryApi.update(id, data);
    return response.data;
  }
  async delete(id) {
    const response = await categoryApi.delete(id);
    return response.data;
  }
}

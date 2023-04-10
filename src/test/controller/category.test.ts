import { createApp, close, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/web';
import { Application } from 'egg';
import { CategoryService } from '../../service/category.service';

describe('test/controller/category.test.ts', () => {

  let app: Application;
  let categoryModel: CategoryService['categoryModel'];

  beforeAll(async () => {
    // create app
    app = await createApp<Framework>();
    categoryModel = await app.applicationContext.getAsync<CategoryService>('categoryService').then(res => res.categoryModel);
    // 模拟生成10条数据
    for (let i = 0; i < 10; i++) {
      await categoryModel.save({
        categoryName: `Test Category ${i}`,
        isEnable: true,
      });
    }
  });

  afterAll(async () => {
    await categoryModel.clear();
    await close(app);
    // 清空数据库
  });

  it('GET请求 /client/category/list', async () => {
    const result = (await createHttpRequest(app).get('/client/category/list'))
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('code');
    expect(result.body.code).toBe(200);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('OK');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toHaveProperty('records');
    expect(result.body.data).toHaveProperty('total');
    expect(result.body.data.records.length).toBe(10);
  })

  it('POST请求 /admin/category/list', async () => {
    const result = await createHttpRequest(app).post('/admin/category/list').send({
      page: 1,
      pageSize: 5,
      isEnable: true,
    })
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('code');
    expect(result.body.code).toBe(200);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('OK');
    expect(result.body).toHaveProperty('data');
    expect(result.body.data).toHaveProperty('records');
    expect(result.body.data).toHaveProperty('total');
    expect(result.body.data.records.length).toBe(5);
  })

  it('POST请求 /admin/category/add', async () => {
    const totalLength = (await categoryModel.findAndCount())[1];
    const result = await createHttpRequest(app).post('/admin/category/add').send({
      categoryName: 'Test Category',
      isEnable: true,
    })
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('code')
    expect(result.body.code).toBe(200);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('OK');
    // 判断数据库长度是否增加
    const [_records, total] = await categoryModel.findAndCount();
    expect(total).toBe(totalLength + 1);
  })

  it('POST请求 /admin/category/update', async () => {
    const result = await createHttpRequest(app).post('/admin/category/update').send({
      id: 1,
      categoryName: 'Test Category Update',
      isEnable: true,
    })
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('code')
    expect(result.body.code).toBe(200);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('OK');
    const category = await categoryModel.findOne({
      where: { id: 1 },
    });
    expect(category.categoryName).toBe('Test Category Update');
  });

  it('POST请求 /admin/category/delete', async () => {
    const totalLength = (await categoryModel.findAndCount())[1];
    const result = await createHttpRequest(app).post('/admin/category/delete').send({
      id: 1,
    })
    expect(result.status).toBe(200);
    expect(result.body).toHaveProperty('code')
    expect(result.body.code).toBe(200);
    expect(result.body).toHaveProperty('message');
    expect(result.body.message).toBe('OK');
    const category = await categoryModel.findOne({
      where: { id: 1 },
    });
    expect(category).toBeNull();
    const [_records, total] = await categoryModel.findAndCount();
    expect(total).toBe(totalLength - 1);
  })

});

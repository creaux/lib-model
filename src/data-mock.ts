import { exec } from 'child_process';
import { join } from 'path';

// TODO: Move mocks of database to the @Decorators and apply them onto models

export enum DataMockEntities {
  POSTS = 'posts',
  SECTIONS = 'sections',
  USERS = 'users',
  ROLES = 'roles',
  ACCESS = 'accesses',
  AUTHS = 'auths',
  PRODUCTS = 'products',
}

export class DataMock {
  private static ENTITIES = {
    [DataMockEntities.POSTS]: '@pyxismedia/lib-model/build/post/post.data.json',
    [DataMockEntities.SECTIONS]: '@pyxismedia/lib-model/build/post/section.data.json',
    [DataMockEntities.USERS]: '@pyxismedia/lib-model/build/user/user.data.json',
    [DataMockEntities.ROLES]: '@pyxismedia/lib-model/build/user/role.data.json',
    [DataMockEntities.ACCESS]: '@pyxismedia/lib-model/build/user/access.data.json',
    [DataMockEntities.AUTHS]: '@pyxismedia/lib-model/build/auth/auth.data.json',
    [DataMockEntities.PRODUCTS]: '@pyxismedia/lib-model/build/eshop/product/product.data.json',
  };

  private static MOCKS = {
    [DataMockEntities.POSTS]: '@pyxismedia/lib-model/build/post/post.en-mock.json',
    [DataMockEntities.SECTIONS]: '@pyxismedia/lib-model/build/post/section.en-mock.json',
    [DataMockEntities.USERS]: '@pyxismedia/lib-model/build/user/user.en-mock.json',
    [DataMockEntities.ROLES]: '@pyxismedia/lib-model/build/user/role.en-mock.json',
    [DataMockEntities.ACCESS]: '@pyxismedia/lib-model/build/user/access.en-mock.json',
    [DataMockEntities.PRODUCTS]: '@pyxismedia/lib-model/build/eshop/product/product.en-mock.json',
  };

  private static exec(cmd: string): Promise<{}> {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve(stdout ? stdout : stderr);
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private data: Map<string, any>;

  constructor() {
    this.data = new Map();
  }

  public async import(entity: DataMockEntities): Promise<{}> {
    const mock = DataMock.MOCKS[entity as keyof typeof DataMock.MOCKS];
    if (mock) {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      this.data.set(entity, require(mock));
    }
    return DataMock.exec(
      `mongoimport --uri=${await this.uri} --collection=${entity} --file=${join(
        'node_modules',
        DataMock.ENTITIES[entity],
      )} --drop --jsonArray`,
    );
  }

  public async importAll() {
    Object.keys(DataMockEntities).forEach(async (key: string) => {
      await this.import(DataMockEntities[key as keyof typeof DataMockEntities]);
    });
  }

  public get uri(): Promise<string> {
    return Promise.resolve(
      `${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}/${process.env.DB_NAME}`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public get(entity: DataMockEntities): any {
    return this.data.get(entity);
  }
}

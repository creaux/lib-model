import { exec } from 'child_process';
import { join } from 'path';

export enum DataMockEntities {
  POSTS = 'posts',
  SECTIONS = 'sections',
  USERS = 'users',
  ROLES = 'roles',
}

export class DataMock {
  private static ENTITIES = {
    [DataMockEntities.POSTS]: '@pyxismedia/lib-model/build/post/post.data.json',
    [DataMockEntities.SECTIONS]: '@pyxismedia/lib-model/build/post/section.data.json',
    [DataMockEntities.USERS]: '@pyxismedia/lib-model/build/user/user.data.json',
    [DataMockEntities.ROLES]: '@pyxismedia/lib-model/build/user/role.data.json',
  };

  private static MOCKS = {
    [DataMockEntities.POSTS]: '@pyxismedia/lib-model/build/post/post.en-mock.json',
    [DataMockEntities.SECTIONS]: '@pyxismedia/lib-model/build/post/section.en-mock.json',
    [DataMockEntities.USERS]: '@pyxismedia/lib-model/build/user/user.en-mock.json',
    [DataMockEntities.ROLES]: '@pyxismedia/lib-model/build/user/role.en-mock.json',
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
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.data.set(entity, require(DataMock.MOCKS[entity as keyof typeof DataMock.MOCKS]));
    return DataMock.exec(
      `mongoimport --uri=${await this.uri} --collection=${entity} --file=${join(
        'node_modules',
        DataMock.ENTITIES[entity],
      )} --drop --jsonArray`,
    );
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

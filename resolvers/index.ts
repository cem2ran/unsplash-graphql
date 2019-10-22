// import  from 'apollo-server-micro'
import {
  getPhotos,
  user,
  likePhoto,
  getPhotoById,
  downloadPhoto,
} from '../fetches';

const resolvers = {
  Mutation: {
    likePhoto: async (_, { id }: { id: string }, { req }: { req: any }) => {
      console.log(req);

      const { authorization } = req.headers;
      try {
        const photo = await likePhoto({ id, accessToken: authorization }).then(
          r => r.json()
        );

        return photo.photo;
      } catch (error) {
        return error;
      }
    },
    downloadPhoto: async (_, { id }: { id: string }) => {
      try {
        return downloadPhoto({ id });
      } catch (error) {
        return error;
      }
    },
  },
  Query: {
    isLogin: (_, _args, { req }) => {
      const { authorization } = req.headers;

      return !!authorization;
    },
    photos: async (_, args) => {
      const promise = await getPhotos(args);
      return promise.json();
    },
    randomPhoto: async (_, args) => {
      const promise = await getPhotos({ ...args, random: true });
      return promise.json();
    },
    getPhotoById: async (_, args) => {
      const promise = await getPhotoById(args);
      return promise.json();
    },
    user: async (_, args) => {
      const promise = await user(args);
      return promise.json()
    },
  },
};

export default resolvers;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("../models/post.entity");
class PostService {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {
        this.index = () => __awaiter(this, void 0, void 0, function* () {
            console.log('Reading posts..');
            const posts = yield (0, typeorm_1.getRepository)(post_entity_1.PostEntity).find();
            return posts;
        });
        this.create = (postBody) => __awaiter(this, void 0, void 0, function* () {
            console.log('Creating post..');
            const { title, content } = postBody;
            const newPost = yield (0, typeorm_1.getRepository)(post_entity_1.PostEntity).save({
                title: title,
                content: content,
            });
            return newPost;
        });
        this.update = () => {
            return 'Update from service';
        };
        this.delete = () => {
            return 'Delete from service';
        };
    }
}
exports.PostService = PostService;

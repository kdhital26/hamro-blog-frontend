import { AppBaseModel } from "./app-base-model";

export class BlogModel extends AppBaseModel{
    constructor(
        public title?: string,
        public description?: string,
        public file?: any[],
        public _id?: string | undefined,
        public imagePath?: string| null,
        public cloudeImage?: string| null,
        public category?: string | 'other',
        public count?: any[],
        public loggedInUser?: string,
        public commentId?: any[],
        public deleteImgCount?: any
    ) {
        super();
        this.description = description;
        this.file = file;
        this.title = title;
        this._id = _id;
        this.imagePath = imagePath;
        this.category = category?.toLowerCase() || 'other';
        this.count =count ? count : [];
        this.loggedInUser = this.getUserName();
        this.commentId = commentId;
        this.deleteImgCount = deleteImgCount;
    }
}
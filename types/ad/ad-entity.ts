export interface NewAdEntity extends Omit<NewArticleAdEntity, 'id'> {
    id?: string;
}

export interface NewArticleAdEntity{
    title: string;
    description: string;
    markdown: string;
    createdAt: Date;
}
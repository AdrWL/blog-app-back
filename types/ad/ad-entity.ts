export interface NewAdEntity extends Omit<NewArticleAdEntity, 'id'> {
    id?: string;
}

export interface NewArticleAdEntity{
    id: string;
    title: string;
    description: string;
    markdown: string;
    createdAt: Date;
}
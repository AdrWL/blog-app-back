export interface NewAdEntity extends Omit<NewArticleAdEntity, 'createdAt'|'id'> {
    id?: string;
    createdAt?: Date | number | string;
}

export interface NewArticleAdEntity {
    title: string;
    description: string;
}
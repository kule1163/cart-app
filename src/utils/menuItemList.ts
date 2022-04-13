import React from 'react';
import { BiCategory } from 'react-icons/bi';
import { IconType } from 'react-icons/lib';
import { MdProductionQuantityLimits} from 'react-icons/md';
import Category, { CategoryProps } from "../components/navbar/Category"
import {v4 as uuidv4} from "uuid"

export interface MenuItem {
    id: string;
    title: string;
    icon: IconType;
    children?: React.FC<CategoryProps> | string;
    path?: string;
}

export const menuItemList:MenuItem[] = [
    {id: uuidv4(), title: "CATEGORY", icon: BiCategory, children: Category },
    {id: uuidv4(), title: "PRODUCTS", icon: MdProductionQuantityLimits, path: "/products"},
]
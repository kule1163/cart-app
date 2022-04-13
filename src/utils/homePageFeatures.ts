import { FaShippingFast } from 'react-icons/fa';
import { GiReturnArrow } from 'react-icons/gi';
import { FaCheckDouble} from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import {v4 as uuidv4} from "uuid" 

interface ListItem {
    text: string;
    icon: IconType;
    id: string;
}

export const featuresList:ListItem[] = [
    {id: uuidv4(), text: "FAST DELIVER", icon: FaShippingFast},
    {id: uuidv4(), text: "15 DAYS RETURN", icon: GiReturnArrow},
    {id: uuidv4(), text: "1 YEAR WARRANTY", icon: FaCheckDouble}
]
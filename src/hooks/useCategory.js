import axios from "axios";
import { useEffect, useState } from "react";

export default function useCategory() {
    const [categories, setCategories] = useState([])

    const getAllCats = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/fetch-all-category`)
            if (data?.success) {
                setCategories(data?.allCategory)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllCats()
    }, [])
    return categories
}
import axios from "axios";
import { useContext } from "react";
import AuthContext, {ContextType} from "../context/AuthContext";

const BASE_URL = "http://127.0.0.1:8000/";



export function getStudentCourses() {
    const { token }: ContextType = useContext(AuthContext) as ContextType;
    return fetch(`${BASE_URL}api/student/course/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}

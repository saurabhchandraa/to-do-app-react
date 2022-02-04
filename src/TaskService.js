import axios from 'axios'

const TASKS_REST_API_URL1 = "http://localhost:8080/tasks/priority/1";
const TASKS_REST_API_URL2 = "http://localhost:8080/tasks/priority/2";
const TASKS_REST_API_URL3 = "http://localhost:8080/tasks/priority/3";

    export const getPriority1 = () => {
        return new Promise(async (resolve, reject)  => {
            axios.get(TASKS_REST_API_URL1).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error);
                reject(error);
            })
        })
    }

    export const getPriority2 = () => {
        return axios.get(TASKS_REST_API_URL2);
    }

    export const getPriority3 = () => {
        return axios.get(TASKS_REST_API_URL3);
    }

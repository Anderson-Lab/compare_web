import axios from "axios";

export async function CreateBlastJob(queryFasta, targetFasta, identificationsFile) {
    let formData = new FormData();

    formData.append('queryDatabase', queryFasta)
    formData.append('hitDatabase', targetFasta)
    formData.append('identificationsFile', identificationsFile)


    try {

        let response = await axios.post("http://localhost:8000/create_blast_job", formData, {
            headers : { 'Content-Type': 'multipart/form-data' }
        })

        if (response.data.success) {
            let job_id = response.data['job_id']
            window.location.href = '/job/'+job_id
            return true
        }


    }
    catch (e) {

    }
}

export async function GetJobStatus(jobId) {
    try {

        let formData = new FormData();

        formData.append('job_id', jobId)

        let response = await axios.post("http://localhost:8000/check_job_status", formData)

        console.log(response.data)

        if (response.data.success) {
            return response.data
        }

    }
    catch (e) {

    }
}

export async function DownloadResults(jobId, format) {
    let resultsUrl = `http://localhost:8000/results/${format}/${jobId}`
    window.open(resultsUrl, '_blank')
}
import axios from "axios";

export async function CreateBlastJob(queryFasta, targetFasta, identificationsFile) {
    let formData = new FormData();

    formData.append('queryDatabase', queryFasta)
    formData.append('hitDatabase', targetFasta)
    formData.append('identificationsFile', identificationsFile)


    try {

        let response = await axios.post("https://birg.dev/masterblasterapi/create_blast_job", formData, {
            headers : { 'Content-Type': 'multipart/form-data' }
        })

        if (response.data.success) {
            let job_id = response.data['job_id']
            window.location.href = '/masterblaster/job/'+job_id
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

        let response = await axios.post("https://birg.dev/masterblasterapi/check_job_status", formData)

        console.log(response.data)

        if (response.data.success) {
            return response.data
        }

    }
    catch (e) {

    }
}

export async function GetAvailableDatabases() {
    try {
        let response = await axios.get("https://birg.dev/masterblasterapi/available_databases")

        console.log('available db response', response.data)
        return response.data.databases
    }
    catch (e) {
        console.error(e)
        return []
    }
}

export async function DownloadResults(jobId, format) {
    let resultsUrl = `https://birg.dev/masterblasterapi/results/${format}/${jobId}`
    window.open(resultsUrl, '_blank')
}
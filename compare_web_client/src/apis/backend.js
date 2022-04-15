import axios from "axios";

export async function CreateStreamlineJob(referenceGenome, referenceChromosome, fastaFile) {
    let formData = new FormData();

    formData.append('referenceGenome', referenceGenome)
    formData.append('referenceChromosome', referenceChromosome)
    formData.append('fastaFile', fastaFile)


    try {

        let response = await axios.post("https://birg.dev/crisprstreamlineapi/create_streamline_job", formData, {
            headers : { 'Content-Type': 'multipart/form-data' }
        })

        if (response.data.success) {
            let job_id = response.data['job_id']
            window.location.href = '/crisprstreamline/job/'+job_id
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

        let response = await axios.post("https://birg.dev/crisprstreamlineapi/check_job_status", formData)

        console.log(response.data)

        if (response.data.success) {
            return response.data
        }

    }
    catch (e) {

    }
}

/*TODO: Modify these functions so they reflect the nature of our outputs.*/
export async function GetAvailableDatabases() {
    try {
        let response = await axios.get("https://birg.dev/crisprstreamlineapi/available_databases")

        console.log('available db response', response.data)
        return response.data.databases
    }
    catch (e) {
        console.error(e)
        return []
    }
}

export async function DownloadResults(jobId, format) {
    let resultsUrl = `https://birg.dev/crisprstreamlineapi/results/${format}/${jobId}`
    window.open(resultsUrl, '_blank')
}
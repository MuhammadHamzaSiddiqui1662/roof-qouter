import { SERVER } from "../config"

export const createPipedriveLead = async (leadData) => {

    try {
        const response = await SERVER.post('/leads', leadData,);
        if (response.status === 201 || response.status === 200) {
            return {
                status: true,
                message: 'Lead created successfully.',
                data: response.data,
            }
        }else{
            return {
                status: false,
                message: 'Failed to create lead. Please try again.',
            }
        }
    }
    catch (error) {
        return {
            status: false,
            message: error.message || 'An error occurred while creating the lead.',
        }
    }
}

export const createPipedrivePerson = async (data) => {
    try {
        const response = await SERVER.post('/persons', data,);
        if (response.status === 201 || response.status === 200) {
            return {
                status: true,
                message: 'Lead created successfully.',
                data: response.data,
            }
        }else{
            return {
                status: false,
                message: 'Failed to create lead. Please try again.',
            }
        }
    }
    catch (error) {
        return {
            status: false,
            message: error.message || 'An error occurred while creating the lead.',
        }
    }
}
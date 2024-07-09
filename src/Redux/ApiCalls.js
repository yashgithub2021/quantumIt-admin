import {
    getAllDocStart,
    getAllDocSuccess,
    getAllDocFailure,
    addDocStart,
    addDocSuccess,
    addDocFailure,
    removeDocStart,
    removeDocSuccess,
    removeDocFailure,
    updateDocStart,
    updateDocSuccess,
    updateDocFailure,
} from './Slices/DoctorSlice';

import {
    deleteProjectStart,
    deleteProjectSuccess,
    deleteProjectFailure
} from './Slices/ProjectSlice';

import {
    getAllPresStart,
    getAllPresSuccess,
    getAllPresFailure,
    addPresStart,
    addPresSuccess,
    addPresFailure,
    removeFaqStart,
    removeFaqSuccess,
    removeFaqFailure
} from './Slices/PresSlice';

import {
    getAllSlotStart,
    getAllSlotSuccess,
    getAllSlotFailure,
    addSlotStart,
    addSlotSuccess,
    addSlotFailure,
} from './Slices/SlotSlice';

import {
    getAllPlanStart,
    getAllPlanSuccess,
    getAllPlanFailure,
    addPlanStart,
    addPlanSuccess,
    addPlanFailure,
    updatePlanStart,
    updatePlanSuccess,
    updatePlanFailure,
    removePlanStart,
    removePlanSuccess,
    removePlanFailure,
} from './Slices/PlanSlice';

import {
    getAllEvalStart,
    getAllEvalSuccess,
    getAllEvalFailure,
    addEvalStart,
    addEvalSuccess,
    addEvalFailure,
    updateEvalStart,
    updateEvalFailure,
    deleteEvalFailure,
    deleteEvalStart,
    deleteEvalSuccess,
    updateEvalSuccess,
} from './Slices/EvalSlice';

import {
    loginStart,
    loginSuccess,
    loginFailure,
    UpdateStart,
    UpdateSuccess,
    UpdateFailure,
} from './Slices/AuthSlice';

import {
    getAllClinicsStart,
    getAllClinicsSuccess,
    getAllClinicsFailure,
    addClinicStart,
    addClinicSuccess,
    addClinicFailure,
    updateClinicStart,
    updateClinicSuccess,
    updateClinicFailure
} from './Slices/ClinicSlice';

import axiosInstance from '../utils/axiosUtil';
const token = localStorage.getItem("token");

export const GetAllDoctors = async (dispatch) => {
    dispatch(getAllDocStart());
    try {
        const { data } = await axiosInstance.get("/api/contributor/contributor", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        console.log(data);
        dispatch(getAllDocSuccess(data));
    } catch (error) {
        dispatch(getAllDocFailure(error?.response?.data?.error));
    }
}

export const AddDoctor = async (dispatch, formdata) => {
    const { name, profileImage, numberOfArticles } = formdata;
    dispatch(addDocStart());
    try {
        const { data } = await axiosInstance.post("/api/contributor/contributor", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addDocSuccess(data));
    } catch (error) {
        dispatch(addDocFailure(error?.response?.data?.error));
    }
}

export const UpdateDoctor = async (dispatch, formdata, id) => {
    const { name, profileImage, numberOfArticles } = formdata;
    dispatch(updateDocStart());
    try {
        const { data } = await axiosInstance.put("/api/contributor/contributor", {
            name, profileImage, numberOfArticles
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id
            }
        });
        dispatch(updateDocSuccess(data));
    } catch (error) {
        dispatch(updateDocFailure(error?.response?.data?.error));
    }
}

export const RemoveDoctor = async (dispatch, formdata) => {
    const { Id } = formdata;
    dispatch(removeDocStart());
    try {
        const { data } = await axiosInstance.delete("/api/contributor/contributor", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: Id
            }
        });
        dispatch(removeDocSuccess(data));
    } catch (error) {
        dispatch(removeDocFailure(error?.response?.data?.error));
    }
}

export const RemoveFaq = async (dispatch, formdata) => {
    const { Id } = formdata;
    dispatch(removeFaqStart());
    try {
        const { data } = await axiosInstance.delete("/api/faq/faq", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: Id
            }
        });
        dispatch(removeFaqSuccess(data));
    } catch (error) {
        dispatch(removeFaqFailure(error?.response?.data?.error));
    }
}

export const GetAllClinics = async (dispatch) => {
    dispatch(getAllClinicsStart());
    try {
        const { data } = await axiosInstance.get("/api/projects/project", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllClinicsSuccess(data));
    } catch (error) {
        dispatch(getAllClinicsFailure(error?.response?.data?.error));
    }
}

export const EditProject = async (dispatch, projectId, updatedProjectData) => {
    dispatch(updateClinicStart());
    try {
        const { data } = await axiosInstance.put(`/api/projects/project/${projectId}`, updatedProjectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(updateClinicSuccess(data));
    } catch (error) {
        dispatch(updateClinicFailure(error?.response?.data?.error));
    }
};

export const GetAllSlots = async (dispatch) => {
    dispatch(getAllSlotStart());
    try {
        const { data } = await axiosInstance.get("/api/contactus/contactus", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllSlotSuccess(data));
    } catch (error) {
        dispatch(getAllSlotFailure(error?.response?.data?.error));
    }
}

export const GetAllPlans = async (dispatch) => {
    dispatch(getAllPlanStart());
    try {
        const { data } = await axiosInstance.get("/api/feedback/feedback", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllPlanSuccess(data));
    } catch (error) {
        dispatch(getAllPlanFailure(error?.response?.data?.error));
    }
}

export const UpdatePlan = async (dispatch, formdata, id) => {
    dispatch(updatePlanStart());
    try {
        const { data } = await axiosInstance.put(`/api/feedback/feedback/${id}`, formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        dispatch(updatePlanSuccess(data));
    } catch (error) {
        dispatch(updatePlanFailure(error?.response?.data?.error));
    }
}

export const RemovePlan = async (dispatch, formdata) => {
    const { Id } = formdata;
    dispatch(removePlanStart());
    try {
        const { data } = await axiosInstance.delete("/api/feedback/feedback", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: Id
            }
        });
        dispatch(removePlanSuccess(data));
    } catch (error) {
        dispatch(removePlanFailure(error?.response?.data?.error));
    }
}

export const AddSlot = async (dispatch, formdata) => {
    dispatch(addSlotStart());
    try {
        const { data } = await axiosInstance.post("/api/admin/create_slot", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addSlotSuccess(data));
    } catch (error) {
        dispatch(addSlotFailure(error?.response?.data?.error));
    }
}

export const AddPlan = async (dispatch, formdata) => {
    dispatch(addPlanStart());
    try {
        const { data } = await axiosInstance.post("/api/admin/plans", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addPlanSuccess(data));
    } catch (error) {
        dispatch(addPlanFailure(error?.response?.data?.error));
    }
}

export const GetPrescriptionForm = async (dispatch) => {
    dispatch(getAllPresStart());
    try {
        const { data } = await axiosInstance.get("/api/faq/faq", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllPresSuccess(data));
    } catch (error) {
        dispatch(getAllPresFailure(error?.response?.data?.error));
    }
}

export const CreateFaq = async (dispatch, formdata) => {
    dispatch(addPresStart());
    try {
        const { data } = await axiosInstance.post("/api/faq/faq", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addPresSuccess(data));
    } catch (error) {
        dispatch(addPresFailure(error?.response?.data?.error));
    }
}

export const SetEvaluationForm = async (dispatch, formdata) => {
    dispatch(addEvalStart());
    try {
        const { data } = await axiosInstance.post("/api/blogs/blog", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addEvalSuccess(data));
    } catch (error) {
        dispatch(addEvalFailure(error?.response?.data?.error));
    }
}

export const GetEvaluationForm = async (dispatch) => {
    dispatch(getAllEvalStart());
    try {
        const { data } = await axiosInstance.get("/api/blogs/blog", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllEvalSuccess(data));
    } catch (error) {
        dispatch(getAllEvalFailure(error?.response?.data?.error));
    }
}

export const DeleteEvaluationForm = async (dispatch, id) => {
    dispatch(deleteEvalStart());
    try {
        const { data } = await axiosInstance.delete(`/api/blogs/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Make sure `token` is defined or passed correctly
            },
        });
        dispatch(deleteEvalSuccess(id)); // Pass the id to the reducer to remove the item from the state
    } catch (error) {
        dispatch(deleteEvalFailure(error?.response?.data?.error));
    }
};

export const UpdateEvaluationForm = async (dispatch, id, formdata) => {
    dispatch(updateEvalStart());
    try {
        const { data } = await axiosInstance.put(`/api/blogs/blog/${id}`, formdata, {
            headers: {
                Authorization: `Bearer ${token}`, // Make sure `token` is defined or passed correctly
            },
        });
        dispatch(updateEvalSuccess(data)); // Pass the updated data to the reducer to update the state
    } catch (error) {
        dispatch(updateEvalFailure(error?.response?.data?.error));
    }
};

export const CreateProject = async (dispatch, formdata) => {
    dispatch(addClinicStart());
    try {
        const { data } = await axiosInstance.post("/api/projects/project", formdata, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(addClinicSuccess(data));
    } catch (error) {
        dispatch(addClinicFailure(error?.response?.data?.error));
    }
}

export const login = async (dispatch, formdata) => {
    dispatch(loginStart());
    try {
        const { data } = await axiosInstance.post("/api/users/register", formdata)
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFailure(error?.response?.data?.error));
    }
}

export const GetProfile = async (dispatch) => {
    dispatch(getAllClinicsStart());
    try {
        const { data } = await axiosInstance.get("/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(getAllClinicsSuccess(data));
    } catch (error) {
        dispatch(getAllClinicsFailure(error?.response?.data?.error));
    }
}

export const updateProfile = async (dispatch, profileData) => {
    // const { token } = getState().auth;
    dispatch(UpdateStart());
    try {
        const { data } = await axiosInstance.put("/api/users/profile/update", profileData, {
            headers: {
                Authorization: `${token}`,
            },
        });
        dispatch(UpdateSuccess({ user: data.user }));
    } catch (error) {
        dispatch(UpdateFailure(error.response?.data?.message || "An error occurred"));
    }
};

export const RemoveProject = async (dispatch, formdata) => {
    const { Id } = formdata;
    dispatch(deleteProjectStart());
    try {
        const { data } = await axiosInstance.delete("api/projects/project", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                id: Id
            }
        });
        dispatch(deleteProjectSuccess(data));
    } catch (error) {
        dispatch(deleteProjectFailure(error?.response?.data?.error));
    }
}


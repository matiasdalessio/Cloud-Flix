import axios from 'axios'

const articulosActions = {
    fetchComments: (info , id , avatar, name) => {
        return async (dispatch, getState) => {
            try {
                var response = await axios.post('http://localhost:4000/api/comment/' + id , {
                    info: info,
                    avatar: avatar,
                    name: name
                }, {
                    headers: {
                        'Authorization': 'Bearer '+ info.token
                    }
                })
                if (response.data.success) {
                    return response.data.response.comments
                }
            } catch (error) {
                console.log(error)
            }
        }
    },

    deleteComment: (id , idAudiovisual) => {
        return async (dispatch, getState) => {
            var response = await axios.delete('http://localhost:4000/api/comment/' + idAudiovisual, {
                data: { idComment: id } 
            })
            if (response.data.success) {
                return response.data.response.comments
            }
        }
    },
}

export default articulosActions
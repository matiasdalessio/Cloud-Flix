import { useEffect } from "react"

const Comment = (props) => {
    const { userLogged, deleteComment, comment, setLegitimateUser, legitimateUser } = props

    useEffect(() => {
        if (userLogged && (comment.userId === userLogged.id)) {
            setLegitimateUser(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [legitimateUser])

    return (
        <div className="commentConteiner">
            <div className="comment">
                <p>{comment.comment}</p>
            </div>
            {
                (userLogged && legitimateUser) &&
                <div className="buttonCloseOn">
                    <p onClick={() => deleteComment(comment._id)}>X</p>
                </div>
            }
        </div>
    )

}

export default Comment
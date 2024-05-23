import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getChannelsAPI } from "@/apis/article"

function useChannel() {
    const navigate = useNavigate()
    const [channelList, setChannelList] = useState([])
    useEffect(() => {
        const getChannelList = async () => {
            try {
                const res = await getChannelsAPI()
                setChannelList(res.channels)
            }
            catch (error) {
                if (error.response) {
                    alert(`Failed to get the channel list with error code: ${error.response.status}\nMessage: ${error.response.data.message}`);
                } else {
                    alert(`Failed to get the channel list. Error message: ${error.message}`);
                }
                navigate('/login')
            }
        }
        getChannelList()
    }, [navigate])
    return {channelList}
}

export {useChannel}
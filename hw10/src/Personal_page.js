import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
const Personalpage = ({ useState, useEffect }) => {
    const [id, setid] = useState('');
    const [username, setusername] = useState('');
    const [avatar, setavatar] = useState('');
    const [blog, setblog] = useState('');
    const [followers, setfollowers] = useState('');
    const [following, setfollowing] = useState('');
    useEffect(() => {
        setInterval(() => {
            fetch('https://api.github.com/users/cjwu', { method: "GET" })
                .then(res => {
                    return res.json();
                })
                .then(res => {
                    console.log(res);
                    setid(res.login);
                    setusername(res.name);
                    setavatar(res.avatar_url);
                    setblog(res.blog);
                    setfollowers(res.followers);
                    setfollowing(res.following);
                })
        }, 500)
    }, [])

    return (
        <div>
            <Avatar alt="IU" src={avatar} sx={{ width: 100, height: 100, margin: "auto" }} />
            <h2>{username}</h2>
            <div style={{ width: 300, margin: "auto" }}>
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{ width: 200, margin: "auto" }}
                >
                    <p>followers : {followers}</p>
                    <p>followering : {following}</p>
                </Stack>
            </div>
            <Button variant="outlined" sx={{ width: 200}}>Edit Profile</Button>
            <div style={{margin: "auto",width: 200}}>
            <p style={{float:'left'}}>ID :  {id}</p>
            <p><LinkRoundedIcon sx={{position:'relative',right:120,top:53}}/><a href={blog}>{blog}</a></p>
            </div>
        </div >
    )
};

export default Personalpage;
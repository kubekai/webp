import {Grid,Item,Image,Icon}from'semantic-ui-react';
import React from'react';
import firebase from'../utils/firebase'
import Topics from'../components/Topics';
import 'firebase/compat/firestore';


function Posts(){
    const [posts,setPosts]=React.useState([]);
    React.useEffect(()=>{
        firebase.firestore().collection("posts").get().then((collectionSnapshot)=>{
            const data=collectionSnapshot.docs.map(docSnapshot=>{
                const id =docSnapshot.id;
                return { ...docSnapshot.data(),id};
            })
            setPosts(data);
        })

    },[])

    return(
    <Grid>
        <Grid.Row>
            <Grid.Column width={3}>
                <Topics></Topics>
            </Grid.Column>
            <Grid.Column width={10}>
                <Item.Group>
                {posts.map((post)=>{
                    return (
                    <Item key={post.id}>
                        <Item.Image src={post.imageUrl} size="tiny"></Item.Image>
                        <Item.Content>
                            <Item.Meta>
                            {post.author.photoURL ?(
                                <Image src={post.author.photoURL} />
                            ) : (
                                <Icon name="user circle"></Icon>

                            )}   
                            {post.topic} {post.author.displayName||'使用者'}
                            </Item.Meta>
                            <Item.Header>{post.title}</Item.Header>
                            <Item.Description>{post.content}</Item.Description>
                            <Item.Extra>留言0 按讚0</Item.Extra>
                        </Item.Content>
                    </Item>)
                })}
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
    </Grid>
    );
}
export default Posts;
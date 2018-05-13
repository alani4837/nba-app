import React, { Component } from 'react';
import { firebaseDB, firebaseVideos, firebaseLooper, firebaseTeams } from '../../../../firebase';

import styles from '../../articles.css';
import Header from './header';
import VideosRelated from '../../../widgets/VideosList/VideosRelated/videosRelated';

class VideoArticle extends Component {

    state={
        article:[],
        team:[],
        teams:[],
        related:[]
    }

    componentWillMount(){
        firebaseDB.ref(`videos/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild("teamId").equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
                this.getRelated();
            })
        })




        //axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
        //.then( respone => {
        //    let article = respone.data[0];
        //
        //    axios.get(`${URL}/teams?id=${article.team}`)
        //    .then(respone =>{
        //        this.setState({
        //            article,
        //            team:respone.data
        //        });
        //        this.getRelated();
        //    })        
        //})
    }

    getRelated = () => {
        firebaseTeams.once('value')
        .then((snapshot) =>{
            const teams = firebaseLooper(snapshot);

            firebaseVideos
            .orderByChild("team")
            .equalTo(this.state.article.team)
            .limitToFirst(3).once('value')
            .then((snapshot)=>{
                const related = firebaseLooper(snapshot);
                this.setState({
                    teams,
                    related
                })
            })
            
        })

        //axios.get(`${URL}/teams`)
        //.then(respone =>{
        //    let teams = respone.data

        //    axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
        //    .then( respone => {
        //        this.setState({
        //            teams,
        //            related:[]
        //        })
        //    })

        //})

    }

    render(){
        const article = this.state.article;
        const team = this.state.team;


        return(
            <div>
                <Header teamData={team[0]}/>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`https://youtube.com/embed/${article.url}`}
                    >
                    </iframe>
                </div>
                <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}
                />
            </div>
        )
    }
}

export default VideoArticle;
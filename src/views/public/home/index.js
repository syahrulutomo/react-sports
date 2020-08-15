import React, { useEffect, useState } from 'react';
import { LayoutDefault, Slider, Section, ThumbnailLoader } from '../../../components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchSports } from '../../../services/redux/actions/sports';
import { fetchLastEvents } from '../../../services/redux/actions/events';
import { fetchLeagues } from '../../../services/redux/actions/leagues';
import { fetchTeamsInLeague } from '../../../services/redux/actions/teams';
import moment from 'moment';

function HomeView(props) {
  const { sports, leagues, teams, lastEvents, onFetchSports, onFetchLastEvents, onFetchLeagues, onFetchTeamsInLeague, loading } = props;
  const [choosenLeagues, setChoosenLeagues] = useState([]);
  const [choosenLastEvent, setChoosenLastEvent] = useState([]);

  const getDate = (date) => {
    return moment(date).format('MMM, DD');
  }

  useEffect(() => {
    onFetchSports();
    onFetchLeagues();
  }, [onFetchLastEvents, onFetchLeagues, onFetchSports]);

  useEffect(() => {
    if(leagues.length > 0) {
      const index = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
      const sliced = leagues.slice(index, index+5);
      setChoosenLeagues(sliced);
    }
    return () => {
      setChoosenLeagues([]);
    };
  }, [leagues]);

  useEffect(() => {
    if(leagues.length > 0) {
      choosenLeagues.forEach(async (item) => {
        await onFetchLastEvents(item.idLeague);
      });
    }
  },[choosenLeagues, leagues, onFetchLastEvents]);


  useEffect(() => {
    if(lastEvents.length > 0) {
      let temp = choosenLastEvent;
      temp.push(lastEvents);
      setChoosenLastEvent(temp);
    }
  }, [choosenLastEvent, lastEvents]);

  useEffect(() => {
    if(leagues.length > 0) {
      const index = Math.floor(Math.random() * (leagues.length - 0 + 1)) + 0;
      onFetchTeamsInLeague(leagues[index].strLeague);
    }
  }, [leagues, onFetchTeamsInLeague]);

  const sportContents = sports.map((s) => {
    return (
      <div 
        key={s.idSport} 
        className="sports-home" 
        style={{ 
          backgroundImage: `url(${s.strSportThumb})`,
          width: '200px',
          height: '120px'
        }}
      />
    )
  }); 
  
  const sportsLoaderStyle = {
    width: '200px',
    height: '120px'
  };
  const sportContentsLoaders =  (
    <Slider data={[
        <ThumbnailLoader key={1} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={2} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={3} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={4} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={5} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={6} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={7} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={8} style={sportsLoaderStyle} />,
        <ThumbnailLoader key={9} style={sportsLoaderStyle} /> 
      ]} 
      width={200} space={16}
    />
  ); 

  const eventLoaderStyle = {
    width: '280px',
    height: '140px'
  };
  const mappedLastEventsLoaders =  (
    <Slider data={[
        <ThumbnailLoader key={1} style={eventLoaderStyle} />,
        <ThumbnailLoader key={2} style={eventLoaderStyle} />,
        <ThumbnailLoader key={3} style={eventLoaderStyle} />,
        <ThumbnailLoader key={4} style={eventLoaderStyle} />,
        <ThumbnailLoader key={5} style={eventLoaderStyle} />,
        <ThumbnailLoader key={6} style={eventLoaderStyle} />,
        <ThumbnailLoader key={7} style={eventLoaderStyle} />,
        <ThumbnailLoader key={8} style={eventLoaderStyle} />,
        <ThumbnailLoader key={9} style={eventLoaderStyle} /> 
      ]} 
      width={260} space={18} style={{ marginBottom: '18px' }}
    />
  ); 

  return (
    <LayoutDefault>
      <Section>
        <h1 className="section-title">Sports</h1>
        {
          loading ? sportContentsLoaders : 
          sportContents.length > 0 ? <Slider data={sportContents} width={200} space={16} /> : '' 
        }
      </Section>
      <Section style={{ paddingBottom: '0' }}>
        <h1 className="section-title">Last Matches</h1>
        {
          choosenLastEvent.length > 0 ?
          (
            choosenLastEvent.map((list, idx) => {
              return ( 
                <Slider key={idx} data={list.map((l) => {
                  return (
                    <div key={l.idEvent} className="match-highlights">
                      <p className="match-highlights-title">{l.strLeague}</p>
                      <div className="match-highlights-content">
                        <div className="match-highlights-content-home">
                          <p className="match-highlights-content-home-team">{l.strHomeTeam}</p>
                        </div>
                        <div className="match-highlights-content-scores">
                          <p className="match-highlights-content-scores-scores">{l.intHomeScore}</p>
                          <p className="match-highlights-content-scores-vs">vs</p>
                          <p className="match-highlights-content-scores-scores">{l.intAwayScore}</p>
                        </div>
                        <div className="match-highlights-content-visitor">
                          <p className="match-highlights-content-visitor-team">{l.strAwayTeam}</p>
                        </div>
                      </div>
                      <div className="match-highlights-info">
                        <p className="match-highlights-info-date">{getDate((l.dateEvent))}</p>
                        <p className="match-highlights-info-time">
                          {
                            l.strTime.split(':')[0]
                          }: 
                          {
                            l.strTime.split(':')[1] 
                          }
                        </p>
                      </div>
                    </div>
                  )
                })} width={260} space={18} style={{ marginBottom: '18px' }}/>
              )
            })
          )
          : mappedLastEventsLoaders
        }
      </Section>
      <Section style={{ border: 'none' }}>
        <h1 className="section-title">Teams</h1>
        <div className="team-list-home">
          {
            teams.length > 0 ?
            teams.map((t) => {
            return (
                <div className="team-list-home-item" key={t.idTeam}>
                  <img src={t.strTeamBadge} alt={t.strTeam} />
                </div>
              )
            })
            : ''
          }
        </div>
      </Section>
      </LayoutDefault>
  );
}

HomeView.propTypes = {
  sports: PropTypes.array,
  leagues: PropTypes.array,
  lastEvents: PropTypes.array,
  teams: PropTypes.array,
  onFetchSports: PropTypes.func,
  onFetchLeagues: PropTypes.func,
  onFetchLastEvents: PropTypes.func,
  onFetchTeamsInLeague: PropTypes.func,
  loading: PropTypes.bool
}

const mapStateToProps = (state) => {
  return {
    sports: state.sports.list,
    lastEvents: state.events.list,
    leagues: state.leagues.list,
    teams: state.teams.list,
    loading: state.sports.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSports: () => dispatch(fetchSports()),
    onFetchLeagues: () => dispatch(fetchLeagues()),
    onFetchLastEvents: (id) => dispatch(fetchLastEvents(id)),
    onFetchTeamsInLeague: (league) => dispatch(fetchTeamsInLeague(league)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);


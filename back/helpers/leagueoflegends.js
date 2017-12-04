var serviceProfile = {
    nickName: null,
    serviceId: null,
    steamProfile: {},
    lolProfile: {},
    battlenetProfile: {}
};

const key = 'RGAPI-ec4221fa-97ac-4723-bc89-1b672772dbda';
var summonerName = 'coltshot';


export default window.lol = {
//para que todos os outros rodem, precisa do summonerID, entao vamos rodar antes
getSummonerId() {
    fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName+'?api_key='+key)
    .then(res => res.json())
    .then(res => {
        serviceProfile.nickName  = res.name
        serviceProfile.serviceId = res.id
        serviceProfile.serviceSecondaryId = res.accountId
    })
},

getLolInfo() {
    var getSummonerByName = fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName+'?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getLeague = fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+serviceProfile.serviceId+'?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getLast20Matches = fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+serviceProfile.serviceSecondaryId+'/recent?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getChampionMasteries = fetch('https://br1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+serviceProfile.serviceId+'?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var combinedData = {"getSummonerByName":{}, "getLeague":{}, "getLast20Matches":{}, "getChampionMasteries":{}};
    Promise.all([getSummonerByName, getLeague, getLast20Matches, getChampionMasteries])
        .then(function(values) {
            combinedData["getSummonerByName"] = values[0];
            combinedData["getLeague"] = values[1];
            combinedData["getLast20Matches"] = values[2];
            combinedData["getChampionMasteries"] = values[3];
            serviceProfile.lolProfile = combinedData.getSummonerByName
            serviceProfile.lolProfile.ranked = combinedData.getLeague[0]
            serviceProfile.lolProfile.lastmatch = combinedData.getLast20Matches.matches[0]
            serviceProfile.lolProfile.masteries = {}
            serviceProfile.lolProfile.masteries.first = combinedData.getChampionMasteries[0]
            serviceProfile.lolProfile.masteries.second = combinedData.getChampionMasteries[1]
            serviceProfile.lolProfile.masteries.third = combinedData.getChampionMasteries[2]
        });
    
    return combinedData;
    
},

getServiceProfile() {
    return serviceProfile
}
}
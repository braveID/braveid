const fetch = require('node-fetch')
const key = 'RGAPI-e127b4fa-7f69-436a-a19d-4d76c30e83c8';
// var summonerName = 'coltshot';


module.exports = {
//para que todos os outros rodem, precisa do summonerID, entao vamos rodar antes
getSummonerId(summonerName) {
    var serviceProfile = {};
    fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName+'?api_key='+key)
    .then(res => res.json())
    .then(res => {
        serviceProfile.nickName  = res.name
        serviceProfile.serviceId = res.id
        serviceProfile.serviceSecondaryId = res.accountId
    })
},

getLolInfo(summonerName, summonerId, accountId, callback) {
    var serviceProfile = {};

    var getSummonerByName = fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/'+summonerName+'?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getLeague = fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/'+summonerId+'?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getLast20Matches = fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/'+accountId+'/recent?api_key='+key)
        .then(function(response) {
            return response.json()
        });

    var getChampionMasteries = fetch('https://br1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/'+summonerId+'?api_key='+key)
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
            serviceProfile = combinedData.getSummonerByName
            serviceProfile.ranked = combinedData.getLeague[0]
            serviceProfile.lastmatch = combinedData.getLast20Matches.matches[0]
            serviceProfile.masteries = {}
            serviceProfile.masteries.first = combinedData.getChampionMasteries[0]
            serviceProfile.masteries.second = combinedData.getChampionMasteries[1]
            serviceProfile.masteries.third = combinedData.getChampionMasteries[2]
            console.log('Fetched LoL information')
            callback(serviceProfile)
        });
    
    return combinedData;
    
},

getServiceProfile() {
    return serviceProfile
}
}
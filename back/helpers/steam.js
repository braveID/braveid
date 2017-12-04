var serviceProfile = {
    nickName: null,
    serviceId: null,
};

const key = '8DD3D47C1DFB6EA97EA7F6665C4FBA20';
var steamids = '76561197996048272';


export default window.steam = {
getSteamInfo() {
    var getPlayerSummaries = fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+key+'&steamids='+steamids)
        .then(function(response) {
            return response.json()
        });

    var getRecentlyPlayedGames = fetch('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+key+'&steamid='+steamids)
        .then(function(response) {
            return response.json()
        });

    var getPlayerBans = fetch('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key='+key+'&steamids='+steamids)
        .then(function(response) {
            return response.json()
        });

    var combinedData = {"getPlayerSummaries":{}, "getRecentlyPlayedGames":{}, "getPlayerBans":{}};
    Promise.all([getPlayerSummaries, getRecentlyPlayedGames, getPlayerBans])
        .then(function(values) {
            combinedData["getPlayerSummaries"] = values[0];
            combinedData["getRecentlyPlayedGames"] = values[1];
            combinedData["getPlayerBans"] = values[2];
            serviceProfile.nickName      = combinedData.getPlayerSummaries.response.players[0].personaname
            serviceProfile.serviceId     = combinedData.getPlayerSummaries.response.players[0].steamid
            serviceProfile.profileUrl    = combinedData.getPlayerSummaries.response.players[0].profileurl
            serviceProfile.avatarFullUrl = combinedData.getPlayerSummaries.response.players[0].avatarfull
            serviceProfile.last2weeksgames = combinedData.getRecentlyPlayedGames.response.games
            serviceProfile.steamBans = combinedData.getPlayerBans.players[0]
        });
    
    return combinedData;
    
},

getServiceProfile() {
    return serviceProfile
}
}
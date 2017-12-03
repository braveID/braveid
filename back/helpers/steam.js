const serviceProfile = () => {
    return {
        nickName: null,
        serviceId: null
    }
}

var steamConfig = '8DD3D47C1DFB6EA97EA7F6665C4FBA20';

let params = new URLSearchParams(Object.entries({
    key : steamConfig,
    steamids : '76561197996048272'
}))

export default window.steam = {
    
    getSteamInfo() {
            fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?' + params)
                .then(res => res.json())
                .then(data => {
                    steamprofile.nickName      = steamrequest.response.players[0].personaname
                    steamprofile.steamId       = steamrequest.response.players[0].steamid
                    steamprofile.profileUrl    = steamrequest.response.players[0].profileurl
                    steamprofile.avatarFullUrl = steamrequest.response.players[0].avatarfull
                })
                
        },

    // getSteamProfile(){
    //     return steamprofile
    // }
}
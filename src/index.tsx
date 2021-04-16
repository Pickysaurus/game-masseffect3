import { types, util } from 'vortex-api';
import * as path from 'path';

const GAME_ID: string = 'masseffect3';
const STEAMAPP_ID: string = '1238020';
const ORIGINAPP_ID: string = 'DR:229644400';

function findGame(): string {
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID, ORIGINAPP_ID])
        .then((game: any) => game.gamePath);
}

function main(context: types.IExtensionContext) {

    context.registerGame({
        id: GAME_ID,
        name: 'Mass Effect 3',
        mergeMods: true,
        queryPath: findGame,
        queryModPath: () => '.',
        logo: 'gameart-me3.jpg',
        executable: () => path.join('Binaries', 'Win32', 'MassEffect3.exe'),
        requiredFiles: [
            path.join('Binaries', 'Win32', 'MassEffect3.exe')
        ],
        details: {
            steamAppId: STEAMAPP_ID,
            originAppId: ORIGINAPP_ID
        }
    });

    return true;
}

export default main;
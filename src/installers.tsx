import { GAME_ID, DLCPATH, DLC_FILE_TYPE, ME3TWEAKS_INI } from './common';
import { ME3TweaksINI } from './types';
import { parseM3TweaksIniFile } from './util';
import { types, util } from 'vortex-api';
import path = require('node:path');

// LOGIC FOR INSTALLING DIFFERENT TYPES OF MOD

// DLC MODS
function testDLCMod(files: string[], gameId: string) {
    const supported = (gameId === GAME_ID) && (!!files.find(f => path.basename(f).toLowerCase() === DLC_FILE_TYPE));

    return Promise.resolve({ supported, requiredFile: []});
}

async function installDLCMod(files: string[]) {
    const moddesc = files.find(f => path.basename(f).toLowerCase() === ME3TWEAKS_INI);
    let manifest : ME3TweaksINI;
    if (moddesc) {
        manifest = await parseM3TweaksIniFile(moddesc);
    }

}

function isDLCModType(gameId: string): boolean {
    return (gameId === GAME_ID);
}

function getDLCPath(api: types.IExtensionApi): string {
    const state = api.getState();
    const discovery = util.getSafe(state, ['settings', 'gameMode', 'discovered', GAME_ID, 'path'], '');
    return DLCPATH(discovery);
}

function testDLCModType(installInstructions: types.IInstruction[]): any {
    return (!!installInstructions.find(instr => instr.type === 'copy' && instr.destination.startsWith('DLC')));
}

export { testDLCMod, installDLCMod, isDLCModType, getDLCPath, testDLCModType };
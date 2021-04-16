import { actions, fs, types, log, selectors, util } from 'vortex-api';
import * as path from 'path';
import { 
    GAME_ID, STEAMAPP_ID, ORIGINAPP_ID,
    ME3_AUTOTOC, ME3_BINKW32, ME3_AUTOTOCBINK
} from './common';
import { testDLCMod, installDLCMod, isDLCModType, getDLCPath, testDLCModType } from './installers';


function findGame(): string {
    // Search the relevant game stores for the installed game. 
    return util.GameStoreHelper.findByAppId([STEAMAPP_ID, ORIGINAPP_ID])
        .then((game: any) => game.gamePath);
}

async function prepareForModding(discovery: types.IDiscoveryResult, api: types.IExtensionApi) {
    // Install and create a mod for the AutoTOC and Binkw32.dll files.
    const gamePath: string = discovery.path;
    try {
        await Promise.all([fs.statAsync(ME3_AUTOTOC(gamePath)), fs.statAsync(ME3_BINKW32(gamePath))]);
        log('debug', 'Mass Effect 3 DLC Enabler detected successfully.');
        return;
    }
    catch (err) {
        log('info', 'Mass Effect 3 DLC Enabler Mod files not detected.', err);
        console.log('ME3 DLC Enabler', err);
        const state: types.IState = api.getState();
        const profile: types.IProfile = selectors.activeProfile(state)
        const mods: types.IMod[] = Object.values(util.getSafe(state, ['persistent', 'mods', GAME_ID], {}));
        const dlcEnableMod: types.IMod = mods.find(mod => util.getSafe(mod, ['attributes', 'me3dlcEnabler'], undefined));
        if (!dlcEnableMod) {
            // Create a new DLC enabler mod.
            const stagingPath: string = selectors.installPath(state);
            const modPath: string = path.join(stagingPath, 'me3-dlc-enabler');

            // Copy the files
            try {
                const filesToCopyBink = await fs.readdirAsync(ME3_AUTOTOCBINK);
                const fileToCopyTOC = await fs.readdirAsync(path.join(ME3_AUTOTOCBINK, 'asi')).map(p => path.join('asi', p));
                const copyList = Array.from(new Set([...fileToCopyTOC, ...filesToCopyBink])).filter(file => !!path.extname(file));
                for (const file of copyList) {
                    const fullPath = path.join(ME3_AUTOTOCBINK, file);
                    const destPath = path.join(modPath, 'Binaries', 'Win32', file);
                    await fs.copyAsync(fullPath, destPath);
                }

            }
            catch(err) {
                console.error('Error copying files', err);
            }

            const mod: types.IMod = {
                id: 'me3-dlc-enabler',
                state: 'installed',
                type: '',
                installationPath: 'me3-dlc-enabler',
                attributes: {
                    allowRating: false,
                    author: 'Erik-JS & SirCxyrtyx',
                    category: 6,
                    description: 'This mod has been installed automatically by Vortex and should remain active. '
                    +'It includes AutoTOC.asi and binkw23.dll which will ensure your TOC files are up to date on launch and enable DLC mods to be loaded.',
                    pictureUrl: path.join(__dirname, 'gameart-me3.jpg'),
                    installTime: new Date(),
                    shortDescription: 'Enables DLC Mods for Mass Effect 3 to be loaded.',
                    logicalFileName: 'DLC Mod Enabler',
                    version: '1.0.0',
                    me3dlcEnabler: true
                }
            };
            api.store.dispatch(actions.addMod(GAME_ID, mod));
        }
        else {
            // Find the DLC enabler mod.
            const modState = util.getSafe(profile, ['modState', dlcEnableMod.id, 'enabled'], false);
            if (modState) return; // if the mod is enabled in this profile, we can exit. 
        }
        // Enable the mod and mark deployment required. 
        api.store.dispatch(actions.setModEnabled(profile.id, 'me3-dlc-enabler', true));
        api.store.dispatch(actions.setDeploymentNecessary(profile.gameId, true));
    }
}

function main(context: types.IExtensionContext): boolean {
    
    // Add ME3 to Vortex! 
    context.registerGame({
        id: GAME_ID,
        name: 'Mass Effect 3',
        mergeMods: true,
        setup: (discovery) => prepareForModding(discovery, context.api),
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

    context.registerInstaller('me3-dlc-installer', 25, testDLCMod, installDLCMod);
    context.registerModType('me3-dlc-modtype', 25, isDLCModType, getDLCPath, testDLCModType, { name: 'Mass Effect 3 DLC Mod' });

    return true;
}

export default main;
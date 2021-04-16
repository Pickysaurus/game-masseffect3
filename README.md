# Vortex Support for Mass Effect 3

This extension is intended to allow mod management for ME3in Vortex. The ReadMe will be updated as developement progresses. 

## Requirements

- Vortex
- NodeJS
- Yarn



## Features

This extension is still in development and is not full featured.

- Automatic detection of the Steam version of the game. (EA Play/Origin detection pending)



## Building and Testing Instructions

1. Ensure you have NodeJS and yarn installed, then clone the repository.
2. Run `yarn install` to install the required dependencies. 
3. Make any changes to the code.
4. Run `yarn build` to compile the extension into the `dist` directory. 
5. Copy the contents of the `dist` directory to `%appdata%\Vortex\plugins\game-masseffect3`.
6. Start Vortex. 



## Contributors

- [Pickysaurus][]

[Pickysaurus]: https://www.nexusmods.com/users/31179975

## Includes content from

- [SirCxyrtyx/AutoTOC-asi][] - AutoTOC.asi is invaluable in ensuring the stability of ME3
- [Erik-JS/masseffect-binkw32][] - The binkw32.dll file allows AutoTOC.asi to be loaded and prevents the DRM checks on DLCs

[Erik-JS/masseffect-binkw32]: https://github.com/Erik-JS/masseffect-binkw32/
[SirCxyrtyx/AutoTOC-asi]: https://gitub.com/SirCxyrtyx/AutoTOC-asi

## Special Thanks

- Mgamerz
- GiftFish
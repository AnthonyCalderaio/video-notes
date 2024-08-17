export enum uploadModes {
    pathed = 'pathed',
    saved = 'saved'
}  

export const environment = {
    production: false,
    appTitle: 'My Angular App (Development)',
    uploadMode: uploadModes.pathed,
};

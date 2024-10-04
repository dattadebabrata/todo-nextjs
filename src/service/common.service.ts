const capitalizeSentence = (string: string, onlyFirstWord: boolean = false) => {
    try {

        if (!string || string?.length === 0) {
            return '';
        }
        if (onlyFirstWord) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        } else {
            const splitStr = string.toLowerCase().split(' ');
            for (let i = 0; i < splitStr.length; i++) {
                splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
            }
            return splitStr.join(' ');
        }
    } catch (error) {
        console.error('Error capitalizing sentence', error);
        return string;
    }
}
const CommonService={
    capitalizeSentence
};
export default CommonService;

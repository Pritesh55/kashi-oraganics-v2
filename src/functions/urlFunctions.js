 export function getLastWord(str) {
    const words = str.split('/');
    return words[words.length - 1];
}

export function get_id_from_url(cur_url) {
    const arr1_of_full_url = cur_url.split('/');
    const arr2_of_only_last_word = arr1_of_full_url.slice(-1);
    const id = arr2_of_only_last_word.join();
    return id
}

export function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}
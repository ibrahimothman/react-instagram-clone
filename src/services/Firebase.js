import {
    query,
    collection,
    getDocs,
    where,
    limit,
    arrayRemove,
    arrayUnion,
    doc,
    updateDoc,
    orderBy,
    getDoc,
} from "@firebase/firestore";
import { db } from "../lib/Firebase";


export async function getUserByUserId(userId) {
    const q = query(collection(db, "users"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q)
    const user = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
    }))

    return user
}

export async function getUserByDocId(docId) {
    console.log(docId);
    const docRef = doc(db, "users", docId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
        return null
    }
    return {
        ...docSnap.data(),
        docId: docSnap.id
    }
}

export async function getSuggestedProfiles(loggedInUserId, following) {
    const excludingArray = following.concat(loggedInUserId)
    const q = query(
        collection(db, "users"),
        where('userId', 'not-in', excludingArray),
        limit(10)
    );

    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))

    console.log(result)
    return result
}

export async function updateLoggedInUserFollowing(loggedInDocId, followedUserId, isFollowing) {
    const loggedInUserDoc = doc(db, "users", loggedInDocId);
    await updateDoc(loggedInUserDoc, {
            following: isFollowing ? arrayRemove(followedUserId) : arrayUnion(followedUserId)
        });
    }

export async function updateFollowedUserFollowers(followedUserDocId, loggedInUserId, isFollowing) {
    const followedUserDoc = doc(db, "users", followedUserDocId);
    await updateDoc(followedUserDoc, {
        followers: isFollowing ? arrayRemove(loggedInUserId) : arrayUnion(loggedInUserId)
    });
}

export async function getPhotos(userIds) {
    const q = query(
        collection(db, "photos"),
        where('userId', 'in', userIds),
        limit(10)
    );

    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
    }))

    return result
}

// user like and dislike a photo
export async function togglePhotoLikes(photoDocId, loggedInUserId, isLiked) {
    const photoDoc = doc(db, "photos", photoDocId);
    await updateDoc(photoDoc, {
        likes: isLiked ? arrayRemove(loggedInUserId) : arrayUnion(loggedInUserId)
    });
}

export async function addComment(photoDocId, comment, displayName) {
    const photoDoc = doc(db, "photos", photoDocId);
    await updateDoc(photoDoc, {
        comments: arrayUnion({ comment, displayName })
    });
}

export async function getPhotosByUserId(userId) {
    const q = query(
        collection(db, "photos"),
        where('userId', '==', userId),
        limit(10)
    );

    const querySnapshot = await getDocs(q)
    const result = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        docId: doc.id
    }))

    return result
}



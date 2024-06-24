var firebaseConfig = {
//hide
    };

firebase.initializeApp(firebaseConfig);
var database = firebase.database(); 
var storage = firebase.storage().ref();

document.getElementById("charityForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var charityName = document.getElementById("charityName").value;
    var charityRegistrationNumber = document.getElementById("charityRegistrationNumber").value;
    var contactInformation = document.getElementById("contactInformation").value;
    var missionStatement = document.getElementById("missionStatement").value;
    var websiteURL = document.getElementById("websiteURL").value;
    var proofNonProfitStatus = document.getElementById("proofNonProfitStatus").files[0];
    var financialInformation = document.getElementById("financialInformation").files[0];
    var leadership = document.getElementById("leadership").value;
    var programsImpact = document.getElementById("programsImpact").value;
    var socialMediaProfiles = document.getElementById("socialMediaProfiles").value;
    var verificationDocuments = document.getElementById("verificationDocuments").files[0];
    var privacyPolicy = document.getElementById("privacyPolicy").checked;
    var logoBranding = document.getElementById("logoBranding").files[0];
    var verificationProcess = document.getElementById("verificationProcess").value;
    var termsConditions = document.getElementById("termsConditions").checked;
    var expirationRenewal = document.getElementById("expirationRenewal").value;
    var supportContact = document.getElementById("supportContact").value;
    var disclaimers = document.getElementById("disclaimers").value;
    userId = sessionStorage.getItem('userid'), // Get the user ID
    userEmail =  sessionStorage.getItem('useremail') // Get the user email


    document.getElementById("processingMessage").style.display = "block";

    var proofNonProfitStatusRef = storage.child("proofNonProfitStatus/" + proofNonProfitStatus.name);
    var financialInformationRef = storage.child("financialInformation/" + financialInformation.name);
    var verificationDocumentsRef = storage.child("verificationDocuments/" + verificationDocuments.name);
    var logoBrandingRef = storage.child("logoBranding/" + logoBranding.name);

    Promise.all([
        proofNonProfitStatusRef.put(proofNonProfitStatus),
        financialInformationRef.put(financialInformation),
        verificationDocumentsRef.put(verificationDocuments),
        logoBrandingRef.put(logoBranding)
    ])
    .then(function() {
        return Promise.all([
            proofNonProfitStatusRef.getDownloadURL(),
            financialInformationRef.getDownloadURL(),
            verificationDocumentsRef.getDownloadURL(),
            logoBrandingRef.getDownloadURL()
        ]);
    })
    .then(function(downloadURLs) {
        var formData = {
            charityName: charityName,
            charityRegistrationNumber: charityRegistrationNumber,
            contactInformation: contactInformation,
            missionStatement: missionStatement,
            websiteURL: websiteURL,
            proofNonProfitStatus: downloadURLs[0],
            financialInformation: downloadURLs[1],
            leadership: leadership,
            programsImpact: programsImpact,
            socialMediaProfiles: socialMediaProfiles,
            verificationDocuments: downloadURLs[2],
            privacyPolicy: privacyPolicy,
            logoBranding: downloadURLs[3],
            verificationProcess: verificationProcess,
            termsConditions: termsConditions,
            expirationRenewal: expirationRenewal,
            supportContact: supportContact,
            disclaimers: disclaimers,
            verified: false,
            userId: sessionStorage.getItem('userid'), // Get the user ID
            userEmail:  sessionStorage.getItem('useremail') // Get the user email        
                };
    
        var newCharityRef = database.ref("charityRequests").push();
        return newCharityRef.set(formData);
    })
    .then(function() {
        document.getElementById("charityForm").style.display = "none";
        document.getElementById("processingMessage").innerHTML = "Verification request submitted successfully. Please wait for verification.";
    })
    .catch(function(error) {
        console.error("Error submitting verification request:", error);
        alert("An error occurred while submitting the verification request. Please try again.");
    });
});

function checkVerificationStatus() {
    var databaseRef = firebase.database().ref("charityRequests");

    databaseRef.on("value", function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
            var verified = childSnapshot.child("verified").val();
            
            if (verified === true) {
                window.location.href = "/charityReqPage/charity.html";
            }
        });
    });
}

setInterval(checkVerificationStatus, 50000);

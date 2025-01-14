jQuery(document).ready(function ($) {
  function fetchCurrentUserProfile() {
    const profileContainer = $("#profile-container");
    profileContainer.html("<p class='text-info'>Loading profile...</p>");

    const token = localStorage.getItem("token");
    if (!token) {
      profileContainer.html(
        "<p class='text-danger'>Error: User not logged in or session expired.</p>"
      );
      return;
    }

    $.ajax({
      url: profileVars.api_url,
      type: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (response) {
        profileContainer.html(`
            <div class="card">
              <div class="card-body">
                <h2 class="card-title text-center mb-4">Data Diri Saya</h2>
                <p><strong>Name:</strong> ${
                  response.data.name || "Unknown User"
                }</p>
                <p><strong>Email:</strong> ${
                  response.data.email || "Not provided"
                }</p>
                <p><strong>Joined:</strong> ${
                  response.data.created_at || "N/A"
                }</p>
                <p><strong>Role:</strong> ${
                  response.data.profile.role || "N/A"
                }</p>
                <p><strong>Membership:</strong> ${
                  response.data.profile.membership || "N/A"
                }</p>
                <p><strong>Verified:</strong> ${
                  response.data.profile.is_verified ? "Yes" : "No"
                }</p>
              </div>
            </div>
          `);
      },
      error: function (xhr) {
        console.error("Error response:", xhr);
        profileContainer.html(
          "<p class='text-danger'>Error: Unable to fetch profile data.</p>"
        );
      },
    });
  }

  fetchCurrentUserProfile();
});

jQuery(document).ready(function ($) {
  function fetchAllUsers(page = 1) {
    const profileContainer = $("#user-container");
    profileContainer.html(
      `<div class="spinner-border text-secondary" role="status"><span class="visually-hidden">Loading...</span></div>`
    );

    const token = localStorage.getItem("token");
    if (!token) {
      profileContainer.html(
        "<p class='text-danger'>Error: User not logged in or session expired.</p>"
      );
      return;
    }

    $.ajax({
      url: `https://api.sempoa.my.id/api/v1/users/me`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (userResponse) {
        const userRole = userResponse.data.profile.role;
        if (userRole !== "admin") {
          profileContainer.html(
            "<p class='text-danger'>Access Denied: Only admins can view this data.</p>"
          );
          return;
        }

        $.ajax({
          url: `https://api.sempoa.my.id/api/v1/users?page=${page}`,
          type: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          success: function (response) {
            if (response.data && Array.isArray(response.data)) {
              let tableHtml = `
                  <h2 class="text-center my-4">Daftar User Profiles KAP TNN</h2>
                  <table class="table table-striped table-bordered table-hover align-middle rounded">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Membership</th>
                        <th>Verified</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                `;

              const { current_page, total_pages } = response.pagination;

              response.data.forEach((user, index) => {
                const globalIndex = (current_page - 1) * 5 + index + 1;
                tableHtml += `
                    <tr>
                      <td>${globalIndex}</td>
                      <td>${user.name || "Unknown User"}</td>
                      <td>${user.email || "Not provided"}</td>
                      <td>${user.profile.role || "N/A"}</td>
                      <td>${user.profile.membership || "N/A"}</td>
                      <td>${user.profile.is_verified ? "Yes" : "No"}</td>
                      <td class="d-flex justify-content-center gap-2">
                        <button class="btn btn-primary btn-sm view-btn" data-id="${
                          user.id
                        }" data-bs-toggle="modal" data-bs-target="#viewModal">View</button>
                        <button class="btn btn-success btn-sm action-btn" data-id="${
                          user.id
                        }" data-action="verify" data-bs-toggle="modal" data-bs-target="#actionModal">Verify</button>
                      </td>
                    </tr>
                  `;
              });

              tableHtml += `</tbody></table>`;

              // Pagination
              tableHtml += `
                  <div class="mt-4 d-flex justify-content-center">
                    <nav aria-label="user profile pagination">
                      <ul class="pagination">
                        <li class="page-item ${
                          current_page <= 1 ? "disabled" : ""
                        }">
                          <a class="page-link" href="#" data-page="${
                            current_page - 1
                          }">Previous</a>
                        </li>
                        ${Array.from({ length: total_pages }, (_, i) => {
                          const pageNumber = i + 1;
                          return `
                            <li class="page-item ${
                              current_page === pageNumber ? "active" : ""
                            }">
                              <a class="page-link" href="#" data-page="${pageNumber}">${pageNumber}</a>
                            </li>
                          `;
                        }).join("")}
                        <li class="page-item ${
                          current_page >= total_pages ? "disabled" : ""
                        }">
                          <a class="page-link" href="#" data-page="${
                            current_page + 1
                          }">Next</a>
                        </li>
                      </ul>
                    </nav>
                  </div>`;

              profileContainer.html(tableHtml);

              $(".page-link").on("click", function (e) {
                e.preventDefault();
                fetchAllUsers($(this).data("page"));
              });

              $(".view-btn").on("click", function () {
                const userId = $(this).data("id");
                handleViewDetails(userId);
              });

              $(".action-btn").on("click", function () {
                const userId = $(this).data("id");
                const action = $(this).data("action");
                openActionModal(userId, action);
              });
            } else {
              profileContainer.html(
                "<p class='text-warning'>No users found.</p>"
              );
            }
          },
          error: function (xhr) {
            console.error("Error response:", xhr);
            profileContainer.html(
              "<p class='text-danger'>Error: Unable to fetch profile data.</p>"
            );
          },
        });
      },
      error: function () {
        profileContainer.html(
          "<p class='text-danger'>Failed to fetch user role.</p>"
        );
      },
    });
  }

  function handleViewDetails(userId) {
    const token = localStorage.getItem("token");
    console.log(userId);
    $.ajax({
      url: `https://api.sempoa.my.id/api/v1/users/user/${userId}`,
      type: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function (user) {
        $("#viewModal .modal-body").html(`
          <p><strong>Name:</strong> ${user.data.name}</p>
          <p><strong>Email:</strong> ${user.data.email}</p>
          <p><strong>Joined:</strong> ${user.data.created_at}</p>
          <p><strong>Company:</strong> ${user.data.profile.company}</p>
          <p><strong>Role:</strong> ${user.data.profile.role}</p>
          <p><strong>Membership:</strong> ${user.data.profile.membership}</p>
          <p><strong>Verified:</strong> ${
            user.data.profile.is_verified ? "Yes" : "No"
          }</p>
        `);
      },
      error: function () {
        $("#viewModal .modal-body").html(
          "<p class='text-danger'>Failed to fetch user details.</p>"
        );
      },
    });
  }

  function openActionModal(userId, action) {
    let modalTitle = "";
    let modalBody = "";

    switch (action) {
      case "verify":
        modalTitle = "Verify User";
        modalBody = "Are you sure you want to verify this user?";
        break;
      case "edit":
        modalTitle = "Edit User";
        modalBody = "Edit functionality not implemented yet.";
        break;
      case "delete":
        modalTitle = "Delete User";
        modalBody = "Are you sure you want to delete this user?";
        break;
    }

    $("#actionModal .modal-title").text(modalTitle);
    $("#actionModal .modal-body").text(modalBody);

    $("#actionModal .confirm-btn")
      .off("click")
      .on("click", function () {
        handleAction(userId, action);
      });
  }

  function handleAction(userId, action) {
    const token = localStorage.getItem("token");
    let url, method;

    switch (action) {
      case "verify":
        url = `https://api.sempoa.my/id/api/v1/users/verify?user_id=${userId}&action=approve`;
        method = "PUT";
        break;
      case "delete":
        url = `https://api.sempoa.my.id/api/v1/users/${userId}`;
        method = "DELETE";
        break;
    }

    $.ajax({
      url,
      type: method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      success: function () {
        window.location.reload();
      },
      error: function () {
        alert(`Failed to ${action} user.`);
      },
    });
  }

  fetchAllUsers();
});

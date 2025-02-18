import axios from "axios";  
import { serverApi } from "../../lib/config";
import { LoginInput, Member, MemberInput, MemberUpdateInput } from "../../lib/types/member";

class MemberService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;
    }

    public async getTopUsers(): Promise<Member[]> {  // multi usage function
        try {
            const url = this.path + "/member/top-users";
            const result = await axios.get(url);
            console.log("getTopUsers: ", result);

           return result.data;
        } catch(err) {
            console.log("Error, getTopUsers:", err);
            throw err;
        }

    }    
    public async getRestaurant(): Promise<Member> {
        try {
            const url = this.path + "/member/restaurant";
            const result = await axios.get(url);

            console.log("getRestaurant:", result);
            const restaurant: Member = result.data;

            return result.data;

        } catch(err){
        console.log("ERROR: getProducts", err);
        throw err;
    }    
}
    public async signup(input: MemberInput): Promise<Member> { 
        try {
            const url = this.path + "/member/signup";
          const result = await axios.post(url, input, {withCredentials: true }); // backend frontend ga cookieni joylaydi
          console.log("signup:", result);

          const member: Member = result.data.member;
          console.log("member: ", member);
          localStorage.setItem("memberData", JSON.stringify(member));// auth bulgan userni memberDATA deb saqlashni buyurdik

          return member;
        } catch (err) {
            console.log("Error: signup", err);
            throw err;
        }
    }

    public async login(input: LoginInput): Promise<Member> { 
        try {
            const url = this.path + "/member/login";
          const result = await axios.post(url, input, {withCredentials: true });// backend frontend ga cookieni joylaydi
          console.log("login:", result);

          const member: Member = result.data.member;
          console.log("member: ", member);
          localStorage.setItem("memberData", JSON.stringify(member));

          return member;
        } catch (err) {
            console.log("Error: login", err);
            throw err;
        }
    }
    public async logout (): Promise<boolean> { 
        try {
            const url = this.path + "/member/logout";
          const result = await axios.post(url, {}, {withCredentials: true });// backend frontend ga cookieni joylaydi
          console.log("logout:", result);
          localStorage.removeItem("memberData");

          return result.data.logout;
        } catch (err) {
            console.log("Error: logout:", err);
            throw err;
        }
    }

    public async updateMember (input: MemberUpdateInput): Promise<Member> { 
        try {
            const formData = new FormData();
            formData.append("memberNick", input.memberNick || "");  // append is used to add data
            formData.append("memberPhone", input.memberPhone || "");
            formData.append("memberAddress", input.memberAddress || "");
            formData.append("memberDesc", input.memberDesc || "");
            formData.append("memberImage", input.memberImage || "");

            const result = await axios(`${serverApi}/member/update`, {
                method: "POST",
                data: formData,
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data", 
                },

            });
            console.log("updateMember: ", result );

            const member: Member = result.data;
            return member;
            localStorage.setItem("memberData", JSON.stringify(member));
        } catch (err) {
            console.log("Error: updateMember", err);
            throw err;
        }
    }


}

export default MemberService;
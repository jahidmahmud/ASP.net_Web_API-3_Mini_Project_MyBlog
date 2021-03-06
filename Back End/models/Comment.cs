//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Blog.Models
{
    using Newtonsoft.Json;
    using System;
    using System.Collections.Generic;
    using System.Xml.Serialization;

    public partial class Comment
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Comment()
        {
            this.Replies = new HashSet<Reply>();
        }
    
        public int ComID { get; set; }
        public Nullable<int> ComUserID { get; set; }
        public Nullable<int> ComPostID { get; set; }
        public string Comment1 { get; set; }
        public Nullable<System.DateTime> CreatedAT { get; set; }

        [JsonIgnore, XmlIgnore]
        public virtual Post Post { get; set; }
        [JsonIgnore, XmlIgnore]
        public virtual User User { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        [JsonIgnore, XmlIgnore]
        public virtual ICollection<Reply> Replies { get; set; }
    }
}
